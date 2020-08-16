import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal
  ,ModalHeader, ModalBody, Label, Row, Col,FormGroup  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalOpen:false
    };

   
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  
  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
       
      });
      console.log("toggle happened")
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    
}

  render() {

    return(
      <div>
      <LocalForm>
      <FormGroup row>
          <Col md={{size: 10}}>
              <Button outline type="submit" color="secondary" onClick={this.toggleModal}>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                  Submit Comment
              </Button>
          </Col>
      </FormGroup>
     </LocalForm>
      <React.Fragment>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader>Submit Comment</ModalHeader>
        <ModalBody>
        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group mr-1 ml-1">
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" className="form-control" id="rating" name="rating">
                                            <option selected value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                </Row>
                            <Row className="form-group mr-1 ml-1">
                                <Label htmlFor="name">Your Name</Label>
                                
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                
                            </Row>
                           
                            
                            <Row className="form-group mr-1 ml-1">
                                <Label htmlFor="comment">Comment</Label>
                                
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
    
                            </Row>
                            <Row className="form-group mr-1 ml-1">
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </Row>
                        </LocalForm>
        </ModalBody>
      </Modal>
      </React.Fragment>
      </div>
    )
  }
};



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
          <div className="col-12  m-1">
            <CommentForm />
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

    
    if (props.dish) {
        return (
          <div className="container">
                <div className="row">
                    <Breadcrumb>
                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
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
