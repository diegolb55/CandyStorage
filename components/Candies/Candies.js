import Candy from "./Candy";
import Image from "next/image";

const Candies = ({ candies, setCandies }) => {
  return (
    <div className="items">
      <Image src="/images/candy.jpg"
        alt="candy"
        fill
        style={{objectFit:"cover", opacity:.6, borderRadius: 20,
        boxShadow: "5px 5px 20px 0px #00000053",
      
      }}
      />
      {candies.map((candy) => (
        <div key={candy._id} style={{position:"relative"}}>
          <Candy candy={candy} setCandies={setCandies} />
        </div>
      ))}
    </div>
  );
};

export default Candies;
