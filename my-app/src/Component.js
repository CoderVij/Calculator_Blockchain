import { useEffect, useState, useRef } from "react";
import Web3Modal from 'web3modal';
import {Contract, ethers, providers, utils} from 'ethers';

import CalcButtons from './CalcButtons.js';
import {NFT_CONTRACT_ADDRESS, abi} from "./constant";

export default function Component()
{
    const [walletConnected,setWalletConnected] = useState(false);
    const[data, setData] = useState('');
    const[numArry, setNumArry] = useState([]);

    const[operator, setOperator] = useState('');

    const totalButtons = [1,2,3,4,5,6,7,8,9,0, '+', '-', '*', '/', '='];

    const [dummyState, setDummyState] = useState(false);
    const [stringLiterals, setStringLiterals] = useState('');
    const [topLiterals, setTopLiterals] = useState('');

    const web3ModalRef = useRef();

    useEffect(()=>{
        web3ModalRef.current = new Web3Modal({
            network:'goerli',
            providerOptions:{}
        });

        if(web3ModalRef.current.providerController.injectedProvider == null)
        {
            alert("Get Walllet");
        }
        
    },[])

    async  function connectWallet() 
    {
        try{

            const providerSigner = await getProviderOrSigner();
            console.log(providerSigner);
            setWalletConnected(true);

        }
        catch(error)
        {
            console.log(error);
        }
    }

    async function getProviderOrSigner(getSigner = false)
    {
        console.log(numArry);
        try
        {
            const provider = await web3ModalRef.current.connect();
            const web3Provider = new providers.Web3Provider(provider);

            const {chainId} = await web3Provider.getNetwork();

            if(chainId !== 5)
            {
                alert("Connect to Goerli Network");
            }

            if(getSigner)
            {
                const signer = web3Provider.getSigner();
                return signer;
            }

            return provider;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const btnElements = totalButtons.map((number) =>
    {
        return number;
    });



    useEffect(()=>{doCalculation();

    },[dummyState, operator]);


    const getDataFromBtnClick = (num) =>
    {
        
        if(num == '+' || num == '-' || num == '*' || num == '/' || num =='=')
        {
            if(num != '=')
                setOperator(num);

            setNumArry(prevNumArry => [...prevNumArry, data]);

            setTopLiterals(topLiterals + data);
            setData('');
            setDummyState(!dummyState);
        }

        else
        {
            setData(data + num);          
        }

        if(num != '=')
            setStringLiterals(stringLiterals + num);

        console.log(operator + " data: " + data  + " literals: " + stringLiterals);
    };

    function doCalculation()
    {
     
        if(operator != '')
        {
            //console.log(numArry.length);
            if(numArry.length > 1)
            {
                calculation(operator)
            }
        }    
    }

    async function calculation(opr)
    {
        // Convert each element of numArry to a BigNumber object
        //console.log(numArry);
        const numbers = numArry.map((n) => utils.parseUnits(n.toString(), 0));
        console.log(numbers.toString());
        try
        {
            const signer = await getProviderOrSigner(true);
            const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
            //console.log(signer);

            var ticket;
            if(opr == '+')
                ticket = await contract.add(numbers);
            else if(opr == '-')
                ticket = await contract.substract(numbers);
            else if(opr == '*')
                ticket = await contract.multiply(numbers);
            else if(opr == '/')
                ticket = await contract.divide(numbers);

            setData(ticket);

            setStringLiterals(ticket);
            setNumArry([]);

        }
        catch(error)
        {
            console.log(error);
            setNumArry([]);
            setData('');
            setTopLiterals('');
            setStringLiterals('');
        }
    }

    return(
        <div>
            <div className="flexDisplay">
            <input className= "litrealArea" type="text" value={stringLiterals} readOnly></input>
            <input className= "inputArea" type="text" value={data} readOnly></input>
            </div>
            <div className="btnBox">       
                <CalcButtons value = {btnElements} sendData={getDataFromBtnClick}></CalcButtons>
            </div>
            
        </div>
    );
}