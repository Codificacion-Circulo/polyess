import React from "react";
import Faq from "react-faq-component";
import './Faqs.css'

const data = {
    rows: [
        {
            title: "Are my files secure with CryptoLock?",
            content: `They are completely secure as only the owner of the file can grant access or remove access to a file that is already encrypted. All files get stored on IPFS after getting encrypted. So you can be assured that your files are always secured.`,
        },
        {
            title: "What is IPFS?",
            content:`The data is stored in IPFS which is like a decentralized cloud based system. more about ipfs here.`,
        },
        {
            title: "How is my file encrypted?",
            content: `Once you upload the file you are required to provide a key(password) to the file which you will also give out to the receiver thus adding another security layer. The standard used to encrypt the file is aes-256-gcm.`,
        },
        {
            title: "How do I share my file with someone?",
            content: `All you need is a MetaMask connected wallet with some ethers for gas fees which ensure not even us can see your data and also the address of the person who wants to see the file.`,
        },
        {
            title: "Can I revoke access once I have given them access to a person?",
            content: `Yes, we provide the feature to revoke access from a file if you no longer want to share it.`,
        },
        {
            title: "Why should I use CryptoLock rather than traditional cloud storage?",
            content: `All the traditional cloud storage are centralized and keep all the data on their server which are prone to hacks and thus making it unreliable, while our idea is completely decentralized and also hack-proof through 3 levels of the system (Blockchain, IPFS, added encryption) thus making it impossible to hack.`,
        },
        {
            title: "What is the file size limit?",
            content: ` The maximum size of the file is 100MB at the moment due to API limitations.`,
        }
    ]
};

const styles = {
    rowTitleTextSize: '1.2rem',
    rowTitleColor: "blue",
    rowContentColor: 'white',
    rowContentTextSize: '1.3rem',
    arrowColor: "#05ffa1",
};

const config = {
    animate: true,
    arrowIcon: "V",
    tabFocus: true
};

const Faqs = props => {
    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
};

export default Faqs;