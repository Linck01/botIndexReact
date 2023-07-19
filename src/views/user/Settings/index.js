import React from 'react';
import UpdatePassword from './UpdatePassword';

const GameSettings = () => {

    const [ isLoading, setIsLoading ] = React.useState(false);

   
    return (
        <>
        
        <UpdatePassword />
        <br /><br />
        {/*}
        <AdvancedSettings currencyName={currencyName} setCurrencyName={setCurrencyName} startCurrency={startCurrency} setStartCurrency={setStartCurrency} password={password} setPassword={setPassword} isPublic={isPublic} setIsPublic={setIsPublic} isEnded={isEnded} setIsEnded={setIsEnded} />
        <br /><br />{*/}
       
        
        </>
        
    );
};

export default GameSettings;
