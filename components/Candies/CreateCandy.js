import { useState } from "react";


const CreateCandy = ({ setCandies }) => {
    
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



    return (

        <div style={{
            padding: 20,
            width: "80%",
            margin: "50px auto",
            borderRadius:25,
            boxShadow: "5px 5px 20px 0px #00000053",
        }}>
            <h3>Add a candy...</h3>
            <form onSubmit={onSubmitCandy}
                className="createCandy"
            >
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
