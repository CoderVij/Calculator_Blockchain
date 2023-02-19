import styles from './App.css';

export default function CalcButtons(props)
{
    const totalBtns = props.value;

    const handleSendData = (num) =>
    {
        props.sendData(num);
    };

    const btns = totalBtns.map((number, index) =>
    {
        return <button className= "CalcBtn" key = {index.toString()}  onClick={()=>handleSendData(number)}> {number}</button>
    })
    return(
        <div>
           {btns}
        </div>
    );
}