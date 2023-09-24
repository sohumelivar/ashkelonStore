import React from "react";
import { observer } from "mobx-react-lite";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


const Message = observer (()=>{
return(
 <div>
<Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" roundedCircle />
        </Col>
      </Row>
    </Container>

 </div>
)

})

export default Message
