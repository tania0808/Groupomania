import React from 'react'

export default function Button(props) {
  return (
    <button onClick={props.onClick} type="button" className={props.class}>{props.value}</button>
  )
}