import React,{useState} from 'react'
import "./newsletter.css"
import { Container,Row,Col } from 'reactstrap'
import maleTourist from "../assets/images/male-tourist.png"
import {Form,Button} from 'reactstrap';
import {BASE_URL} from '../utils/Config';

const NewsLetter = () => {
    const url=`${BASE_URL}/sendMail`;
    const [name, setName] = useState("");
    const [email,setEmail]=useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log('Submited');
        console.log(name,email);
        try
        {
            const res=await fetch(url,{
                method:'Post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({name:name,email:email,subject:"Welcome to TravelWorld",message:`Dear ${name},\n\nYou have been subscribed successfully.\n\nThank you for choosing us.\n\n We will send amazing offers in future \n\nRegards,\nTour Management Team`}) 
            })
            const result=res.json();
            if(!res.ok)
            {
                alert(result.message);
            }
            alert("Subscribed Successfully");
        }catch(err)
        {
            alert(err.message);
        }
    }
    // const hover1=()=>{
    //     // document.getElementById("focusing").style.backgroundColor="rgb(0, 0, 0)";
    //     document.getElementById("focusing").style.backgroundColor="rgb(0, 0, 0)"
    // }
  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                        <h2>Subscribe to get useful travelling information.</h2>
                            <Form onSubmit={handlesubmit} method="POST">
                        <div className="newsletter__input">
                                <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                                <input type="email" placeholder='Email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                <Button className="btn newsletter__btn" id="focusing" onClick={handlesubmit}>Subscribe</Button>
                        </div>
                            </Form>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, alias!</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="immg" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default NewsLetter