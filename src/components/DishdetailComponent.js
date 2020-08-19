import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal
  ,ModalHeader, ModalBody, Label, Row, Col,FormGroup  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    
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
                                <Label htmlFor="author">Your Name</Label>
                                
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                
                                    <Control.textarea model=".comment" id="comment" name="comment"
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
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
          );
          else
          return(
              <div></div>
          );
    }

 function RenderComments({comments, postComment, dishId}) {
    
      if(comments != null) {
      
        
        
            return (
              <div>
              <h4>Comments</h4>
              
            <div className="col-12  m-1">
              <ul className="list-unstyled">
              <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
            </ul>
          </div>
          <div className="col-12  m-1">
          <CommentForm dishId={dishId} postComment={postComment} />
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

    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) 
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
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
                </div>
        );
    
}



export default Dishdetail;
