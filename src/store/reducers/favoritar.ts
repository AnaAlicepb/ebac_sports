import { Produto } from './../../App'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type favoritoState = {
  itens: Produto[]
}

const initialState: favoritoState = {
  itens: []
}

const favoritosSilice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const product = action.payload
      if (state.itens.find((products) => products.id === product.id)) {
        const favoritosSemProduto = state.itens.filter(
          (products) => products.id !== product.id
        )
        state.itens = favoritosSemProduto
      } else {
        state.itens.push(product)
      }
    }
  }
})

export const { favoritar } = favoritosSilice.actions

export default favoritosSilice.reducer
