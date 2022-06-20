import React from 'react'
import Button from '../button/Button'

export default function PostCard(props) {
        return (
          <div className="card d-flex flex-lg-row flex-sm-column align-items-sm-center align-items-lg-start text-center">
              <img className='rounded-3 postImage col-lg-4 col-sm-12 card-img-end img-fluid p-1' src={props.post.imageUrl} alt="" width={500}/>
              <div className="col-lg-8 col-sm-12 card-body align-items-center">
                  <div className="card-title">
                      <h1>{props.post.title}</h1>
                  </div>
                  <div className="card-text">
                      <p>{props.post.postText}</p>
                      <p className=''>Created at : {props.date}</p>
                  </div>
                  {props.user &&
                  <div className="card-modificators">
                      <Button value={'Modify'} class={"btn btn-success m-4 py-2"}/>
                      <Button value={'Delete'} class={"btn btn-danger py-2"}/>
                  </div>
                  }
              </div>
          </div>
        )
}
