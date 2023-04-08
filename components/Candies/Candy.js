import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';






const Candy = ({ candy, setCandies }) => {

    const { _id, name, flavor, quantity, price } = candy;

    const [modalOpened, setModalOpened] = useState(false);
    

    const [deleted, setDeleted] = useState(false);

    const [inputDisabled, setInputDisabled] = useState(false);

    const [newName, setNewName] = useState("")
    const [newFlavor, setNewFlavor] = useState("")
    const [newQuantity, setNewQuantity] = useState("")
    const [newPrice, setNewPrice] = useState("")
  
    const editCandy = () => {
        setModalOpened(true);
    };

    const onUpdateCandy = async () => {
        setInputDisabled(true);
        const response = await fetch("/api/candies", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id,
                name: newName,
                flavor: newFlavor,
                quantity: newQuantity,
                price: newPrice,
            }),
        });

        const responseJson = await response.json();

        console.log(responseJson);

        setCandies((candies) =>
            candies.map((candy) => {
                if (candy._id === _id) {
                    return {
                        _id,
                        name: newName,
                        flavor: newFlavor,
                        quantity: newQuantity,
                        price: newPrice,
                    };
                }

                return candy;
            })
        );

        setInputDisabled(false);
        setModalOpened(false);
    };

    const deleteCandy = async () => {
        const response = await fetch(`/api/candies/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id,
            }),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        setDeleted(true);
    };


    return (
        <>
            {!deleted && (
                <>
                    
                    <Modal
                        sx={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        open={modalOpened}
                        onClose={()=>setModalOpened(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            height: 300,
                            width: 300,
                            background:"white",
                            padding: "20px",
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit candy...
                            </Typography>
                            <form onSubmit={()=>onUpdateCandy()} className="updatef">
                                <input type="text" value={newName}
                                    placeholder={`${name}`}
                                    onChange={(e)=>setNewName(e.target.value)}
                                />
                                <input type="text" value={newFlavor}
                                    placeholder={`${flavor}`}
                                    onChange={(e)=>setNewFlavor(e.target.value)}
                                />
                                <input type="text" value={newQuantity}
                                    placeholder={`${quantity}`}
                                    onChange={(e)=>setNewQuantity(e.target.value)}
                                />
                                <input type="text" value={newPrice}
                                    placeholder={`$${price}`}
                                    onChange={(e)=>setNewPrice(e.target.value)}
                                />
                                
                                <Button size="small" type="submit">update</Button>
                            </form>

                        </Box>
                    </Modal>
                    
                    <Card sx={{  width:240, margin: "10px" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {flavor}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                quantity: {quantity}
                            </Typography>
                            <Typography variant="body2">
                                ${price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => deleteCandy()}>delete</Button>
                            <Button size="small" onClick={() => editCandy()}>update</Button>

                        </CardActions>
                    </Card>
                    
                    
                </>
            )}
        </>
    );
};

export default Candy;
