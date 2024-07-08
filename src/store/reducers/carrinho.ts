import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from './../../App'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

const carrinhoSilice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const product = action.payload
      const itemExistente = state.itens.some((p) => p.id === product.id)
      if (itemExistente) {
        alert('Item já adicionado')
      } else {
        state.itens.push(product)
      }
    }
  }
})

export const { adicionar } = carrinhoSilice.actions
export default carrinhoSilice.reducer
