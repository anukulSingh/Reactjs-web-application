import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';




   

   function RenderDish({dish}) {
      if (dish != null)
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
          else
          return(
              <div></div>
          );
    }

 function RenderComments({comments}) {
    
      if(comments != null) {
      
        
        
            return (
              <div>
              <h4>Comments</h4>
              
            <div className="col-12  m-1">
              <ul className="list-unstyled">
                {comments.map(comment => <li key={comment.id}>
                
                <p>{comment.comment}</p>
                <p>{" -- "+comment.author+" , "}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p><br />
              </li>)}
              
            </ul>
          </div>
          </div>
            );
          //})
          
        }
      else
        return(
          <div></div>
        );
    
  }
   

  const Dishdetail = (props) => {  

    console.log('Dishdetail Component render invoked')
    if (props.dish) {
        const dish = props.dish;
        const dishdetail = <RenderDish dish={props.dish} />
        const dishcomments = <RenderComments comments={props.dish.comments} />
        return (
          <div className="container">
            <div className="row">
              <div  className="col-12 col-md-5 m-1">
                 {dishdetail}
              </div>
              <div  className="col-12 col-md-5 m-1">
                 {dishcomments}
              </div>
               
            </div>
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}



export default Dishdetail;
