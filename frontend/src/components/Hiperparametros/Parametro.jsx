const Parametro = ({ nome, valor }) => {
  return <div className="parametro">
    <label>{nome}</label>
    <input type="text" value={valor} />
  </div>
}

export default Parametro