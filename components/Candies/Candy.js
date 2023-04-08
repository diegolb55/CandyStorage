import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';

// import { Edit, Trash, Heart, Share, BrandTwitter, Check } from "tabler-icons-react";
// import { useForm } from "@mantine/form";

const tweetUrl = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fsocialbutterfly.vercel.app%2F&text=Check%20out%20this%20cool%20social%20media%20Jamstack%20app%20I%20made%20using%20the%20@MongoDB%20Data%20API%2C%20@Vercel%20serverless%20functions%2C%20@GitHub%2C%20and%20@Auth0%20for%20user%20authentication%21%21%21";

// const useStyles = createStyles((theme) => ({
//   flutter: {
//     padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
//     marginBottom: theme.spacing.sm,
//   },

//   body: {
//     paddingLeft: 54,
//     paddingTop: theme.spacing.sm,
//     fontSize: theme.fontSizes.sm,
//   },

//   content: {
//     "& > p:last-child": {
//       marginBottom: 0,
//     },
//   },

//   liked: {
//     fill: theme.colors.red[6],
//   },

//   footer: {
//     padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
//     marginTop: theme.spacing.md,
//     borderTop: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
//     }`,
//   },
// }));

const Candy = ({ candy, setCandies }) => {

    //   const { _id, postedAt, body, user: flutterUser } = flutter;
    const { _id, name, flavor, quantity, price } = candy;

    const [modalOpened, setModalOpened] = useState(false);
    

    const [deleted, setDeleted] = useState(false);

    const [inputDisabled, setInputDisabled] = useState(false);

    const [newName, setNewName] = useState("")
    const [newFlavor, setNewFlavor] = useState("")
    const [newQuantity, setNewQuantity] = useState("")
    const [newPrice, setNewPrice] = useState("")
  
    const editCandy = () => {
        // form.setFieldValue("editFlutter", body);
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

        // form.reset();
        setInputDisabled(false);
        setModalOpened(false);
        // showSuccess('Your flutter has been updated');
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

    // const showSuccess = (message) => {
    //     showNotification({
    //         title: "Success",
    //         message,
    //         icon: <Check size={18} />,
    //         autoClose: 5000,
    //         styles: (theme) => ({
    //             root: {
    //                 borderColor: theme.colors.green[6],
    //             }
    //         }),
    //     });
    // };

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
                            border: "2px solid red",
                            height: 300,
                            width: 300,
                            background:"white"
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit your candy
                            </Typography>
                            <form onSubmit={()=>onUpdateCandy()}>
                                <input type="text" value={newName}
                                    placeholder="name"
                                    onChange={(e)=>setNewName(e.target.value)}
                                />
                                <input type="text" value={newFlavor}
                                    placeholder="flavor"
                                    onChange={(e)=>setNewFlavor(e.target.value)}
                                />
                                <input type="text" value={newQuantity}
                                    placeholder="quantity"
                                    onChange={(e)=>setNewQuantity(e.target.value)}
                                />
                                <input type="text" value={newPrice}
                                    placeholder="price"
                                    onChange={(e)=>setNewPrice(e.target.value)}
                                />
                                
                                <Button size="small" type="submit">update</Button>
                            </form>

                        </Box>
                    </Modal>
                    
                    <Card sx={{  width:270, margin:"10px auto" }}>
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
