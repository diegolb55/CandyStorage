import Candy from "./Candy";

const Candies = ({ candies, setCandies }) => {
  return (
    <>
      {candies.map((candy) => (
        <div key={candy._id}>
          <Candy candy={candy} setCandies={setCandies} />
        </div>
      ))}
    </>
  );
};

export default Candies;
