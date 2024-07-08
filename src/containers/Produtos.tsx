import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'

import * as S from './styles'
import { RootReducer } from '../store'

const ProdutosComponent = () => {
  const { data: produtos, isLoading, isError } = useGetProdutosQuery()
  const favoritos = useSelector((state: RootReducer) => state.favoritos.itens)
  const [showProdutos, setShowProdutos] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const minLoadingTime = 2000
    const timer = setTimeout(() => {
      setLoadingComplete(true)
    }, minLoadingTime)

    if (!isLoading) {
      clearTimeout(timer)
      setLoadingComplete(true)
    }

    return () => clearTimeout(timer)
  }, [isLoading])

  useEffect(() => {
    if (loadingComplete) {
      const displayTimer = setTimeout(() => {
        setShowProdutos(true)
      }, 2000)

      return () => clearTimeout(displayTimer)
    }
  }, [loadingComplete])

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const productID = produto.id
    const idsDosFavoritos = favoritos.map((f) => f.id)
    return idsDosFavoritos.includes(productID)
  }

  if (!showProdutos) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Erro ao carregar produtos</div>
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
