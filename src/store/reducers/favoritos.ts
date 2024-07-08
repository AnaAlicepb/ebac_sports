import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from './../../App'

type FavoritoState = {
  itens: Produto[]
}

const initialState: FavoritoState = {
  itens: []
}

const favoritosSilice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const product = action.payload
      const itemExistente = state.itens.find((p) => p.id === product.id)
      if (itemExistente) {
        const favoritosSemProduto = state.itens.filter(
          (p) => p.id !== product.id
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
