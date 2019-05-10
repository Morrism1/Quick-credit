const IdGenerator = () => Number(Math.random().toPrecision(20).substr(2, 9));

export default IdGenerator;
