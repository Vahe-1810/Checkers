const Piece = ({ src }: { src: string }) => {
  return <div className="piece" style={{ backgroundImage: `url(${src})` }} />;
};

export default Piece;
