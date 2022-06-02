import { Guid } from "../../FrontEnd/src/app/model/guid.model";
import { Transacao } from "../models/Transacao";
import { BancoRepository } from "../repository/BancoRepository";
import { CartaoRepository } from "../repository/CartaoRepository";
import { TagRepository } from "../repository/TagRepository";
import { TransacaoRepository } from "../repository/TransacaoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const transacaoRepository = new TransacaoRepository();
const bancoRepository = new BancoRepository();
const cartaoRepository = new CartaoRepository();
const usuarioRepository = new UsuarioRepository();
const tagRepository = new TagRepository();

export class _TransacaoService {

    async adicionaTransacao(idUsuario: string, body) {
        let newId: string = Guid.newGuid();

        const usuario = await usuarioRepository.getById(idUsuario);
        if (usuario) {
            const transacao = new Transacao(body.descricao, body.entrada, body.valor, body.metodo, body.parcelado, body.quantidadeParcelas, body.data, usuario);
            transacao.id = newId;
            transacao.pago = body.pago;

            if (body.bancoid != '' && body.bancoid != null && body.bancoid != undefined) {
                const banco = await bancoRepository.getById(body.bancoid);
                if (transacao.pago) {
                    if (transacao.entrada) {
                        banco.saldo += transacao.valor
                    } else {
                        banco.saldo -= transacao.valor
                    }
                    await bancoRepository.update(banco);
                }
                transacao.banco = banco;
            }

            if (body.cartaoid != '' && body.cartaoid != null && body.cartaoid != undefined) {
                const cartao = await cartaoRepository.getById(body.cartaoid);
                if (cartao.bancoCadastrado != null && cartao.bancoCadastrado) {
                    if (transacao.pago) {
                        const banco = await bancoRepository.getById(cartao.bancoCartao.id);
                        if (transacao.entrada) {
                            banco.saldo += transacao.valor
                        } else {
                            banco.saldo -= transacao.valor
                        }
                        await bancoRepository.update(banco);
                    }
                }
                transacao.cartao = cartao;
            }

            if (transacao.parcelado) {
                await this.adicionaTransacaoParcelada(transacao, body.tags)
            } else {
                await this.criaTransacao(newId, transacao, body.tags);
            }


            return true;
        } else {
            return false;
        }
    }

    private async criaTransacao(idTransacao: string, transacao: Transacao, tags: string[]) {
        await transacaoRepository.salvar(transacao);
        if (tags != null && tags.length > 0) {
            tags.forEach(async tag => {
                await tagRepository.novaTagTransacao(tag, idTransacao);
            })
        }
    }

    async adicionaTransacaoParcelada(transacao: Transacao, tags: string[]) {
        let desc: string = transacao.descricao;
        let date: Date = new Date(transacao.data);
        for (let index = 0; index < transacao.quantidadeParcelas; index++) {
            transacao.id = Guid.newGuid();
            transacao.descricao += " (" + (index + 1) + "/" + transacao.quantidadeParcelas + ")";
            await this.criaTransacao(transacao.id, transacao, tags);
            transacao.descricao = desc;
            transacao.pago = false;
            date.setMonth(date.getMonth() + 1);
            transacao.data = date;
        }
    }

    async atualizaTransacao(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        const transacao = new Transacao(body.descricao, body.entrada, body.valor, body.metodo, body.parcelado, body.quantidadeParcelas, body.data, usuario);
        transacao.id = body.id;
        transacao.pago = body.pago;
        const pagoeValor = await transacaoRepository.getPagoeValor(transacao.id);
        if (pagoeValor[0].pago != transacao.pago) {
            if (body.cartao != null && body.cartao.bancoCadastrado) {
                const bancoId = await cartaoRepository.getBancoCartaoId(body.cartao.id);
                await this.atualizaBancoComNovoSaldo(bancoId[0].bancoCartaoId, pagoeValor[0].valor, transacao.valor, transacao.entrada, true, transacao.pago);
            } else if (body.banco != null) {
                await this.atualizaBancoComNovoSaldo(body.banco.id, pagoeValor[0].valor, transacao.valor, transacao.entrada, true, transacao.pago);
            }
        } else if (pagoeValor[0].pago && pagoeValor[0].pago == transacao.pago) {
            if (body.cartao != null && body.cartao.bancoCadastrado) {
                const bancoId = await cartaoRepository.getBancoCartaoId(body.cartao.id);
                await this.atualizaBancoComNovoSaldo(bancoId[0].bancoCartaoId, pagoeValor[0].valor, transacao.valor, transacao.entrada, false);
            } else if (body.banco != null) {
                await this.atualizaBancoComNovoSaldo(body.banco.id, pagoeValor[0].valor, transacao.valor, transacao.entrada, false);
            }
        }

        const response = await transacaoRepository.update(transacao);
        return response;
    }

    async deletaTransacao(idTransacao: string) {
        if (idTransacao != null || idTransacao != '') {
            let transacao = await transacaoRepository.getById(idTransacao);
            if (transacao.metodo == 'Pix' && transacao.pago) {
                await bancoRepository.atualizaSaldo(transacao.banco.id, transacao.valor, !transacao.entrada);
            } else if (transacao.metodo == 'Cartão' && transacao.pago) {
                const cartao = await cartaoRepository.getById(transacao.cartao.id);
                if (cartao.bancoCadastrado != null && cartao.bancoCadastrado && transacao.pago) {
                    await bancoRepository.atualizaSaldo(cartao.bancoCartao.id, transacao.valor, !transacao.entrada);
                }
            }
            await transacaoRepository.delete(idTransacao);
            return true;
        } else {
            return false;
        }
    }

    async atualizaBancoComNovoSaldo(bancoid: string, valorAnterior: number, valorNovo: number, entrada: boolean, mudouPago: boolean, pagoValor?: boolean) {

        if (mudouPago) {
            if (pagoValor) {
                await bancoRepository.atualizaSaldo(bancoid, parseFloat(valorNovo.toString()), entrada);
            } else {
                if (valorAnterior == valorNovo) {
                    await bancoRepository.atualizaSaldo(bancoid, parseFloat(valorNovo.toString()), !entrada);
                } else {
                    await bancoRepository.atualizaSaldo(bancoid, parseFloat(valorAnterior.toString()), !entrada);
                }
            }
        } else {
            if (valorAnterior != valorNovo) {
                const banco = await bancoRepository.getById(bancoid);
                if (entrada) {
                    banco.saldo = banco.saldo - (parseFloat(valorAnterior.toString()) - parseFloat(valorNovo.toString()))
                } else {
                    banco.saldo = banco.saldo + (parseFloat(valorAnterior.toString()) - parseFloat(valorNovo.toString()))
                }
                await bancoRepository.update(banco);
            }
        }

    }

    async retornaTransacaoPorId(idTransacao: string) {
        const transacao = await transacaoRepository.getById(idTransacao);
        if (transacao != null) {
            return transacao;
        } else {
            return null;
        }
    }

    async retornaTransacaoFiltroPorMes(idUsuario: string, mes: number) {
        const transacoes = await transacaoRepository.getByMonth(idUsuario, mes);
        if (transacoes != null) {
            return transacoes;
        } else {
            return null;
        }
    }

    async retornaTotalPorMes(idUsuario: string) {
        const total = await transacaoRepository.getSumByMonth(idUsuario);
        return total;
    }
}