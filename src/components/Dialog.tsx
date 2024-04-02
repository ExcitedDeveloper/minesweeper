import React from 'react'

const Dialog = () => {
  return (
    <dialog>
      <form>
        <input type='text' />
        <button formMethod='dialog' type='submit'>
          Cancel
        </button>
        <button type='submit'>Submit</button>
      </form>
    </dialog>
  )
}

export default Dialog
