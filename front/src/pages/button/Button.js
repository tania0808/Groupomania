import React from 'react'

export default function Button(props) {
  return (
    <button  onClick={props.onClick} type={props.type} className={props.class}>{props.value}</button>
  )
}