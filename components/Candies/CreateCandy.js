import { useState } from "react";
// import { createStyles, Avatar, Group, Textarea, Button } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { showNotification } from '@mantine/notifications';
// import { Check } from 'tabler-icons-react';

const demoUser = {
    id: "6276d0c602ce122f7b8b11ec",
    name: "Jesse Hall",
    nickname: "codestackr",
    picture:
        "https://lh3.googleusercontent.com/a-/AOh14GgPdA54bhnYcSngbZxMuSLe-khjk-BaaKWsvmxD=s96-c",
};

// const useStyles = createStyles((theme) => ({
//   flutter: {
//     padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
//   },
//   createFlutter: {
//     justifyContent: "center",
//   },
//   media: {
//     width: "50vw",
//     [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
//       width: "25vw",
//     },
//   },
// }));

const CreateCandy = ({ setCandies }) => {
    const user = demoUser;
    //   const { classes } = useStyles();
    //   const form = useForm({
    //     initialValues: {
    //       flutter: "",
    //     },
    //   });
    const [inputDisabled, setInputDisabled] = useState(false);

    const [name, setName] = useState("")
    const [flavor, setFlavor] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")


    const onSubmitCandy = async () => {
        setInputDisabled(true);
        const candy = {
            name: name,
            flavor: flavor,
            quantity: quantity,
            price: price,
            
        };
        const response = await fetch("/api/candies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(candy),
        });

        const responseJson = await response.json();

        setCandies((candies) => [
            {
                _id: responseJson.insertedId,
                ...candy
            },
            ...candies,
        ]);
        // form.reset();
        setInputDisabled(false);
        // showSuccess();
    };

    // const showSuccess = () => {
    //     showNotification({
    //         title: "Success",
    //         message: "Your flutter has been sent",
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
        // <Group position={"center"} mt={10} mb={20}>
        //     <Avatar src={user.picture} alt={user.name} radius="xl" />
        //     <form onSubmit={form.onSubmit((value) => onSubmitFlutter(value))}>
        //         <Group>
        //             <Textarea
        //                 required
        //                 placeholder="Send a flutter..."
        //                 variant="filled"
        //                 className={classes.media}
        //                 {...form.getInputProps("flutter")}
        //             />
        //             <Button type="submit" disabled={inputDisabled}>Send</Button>
        //         </Group>
        //     </form>
        // </Group>
        <div style={{
            padding: 20,
            border: "2px solid red"
        }}>
            <h3>Add a candy...</h3>
            <form onSubmit={onSubmitCandy}>
                <input type="text" value={name}
                    placeholder="name"
                    onChange={(e)=>setName(e.target.value)}
                />
                <input type="text" value={flavor}
                    placeholder="flavor"
                    onChange={(e)=>setFlavor(e.target.value)}
                />
                <input type="text" value={quantity}
                    placeholder="quantity"
                    onChange={(e)=>setQuantity(e.target.value)}
                />
                <input type="text" value={price}
                    placeholder="price"
                    onChange={(e)=>setPrice(e.target.value)}
                />
                
                <button type="submit"
                    disabled={inputDisabled}
                >add</button>
            </form>
        </div>
    );
};

export default CreateCandy;
