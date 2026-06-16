import React from 'react'

export const phoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/\d/.test(e.key) &&
    e.key !== 'Backspace' &&
    e.key !== 'Delete' &&
    e.key !== 'Tab' &&
    e.key !== 'ArrowLeft' &&
    e.key !== 'ArrowRight'
  ) {
    e.preventDefault()
  }
}
