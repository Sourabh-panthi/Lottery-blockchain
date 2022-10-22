import style from "../styles/Header.module.css";

const ConnectWalletBtn = ({ ConnectWallet }) => {
  // TODO: Get the connect wallet function from the context.
  // TODO: Add onClick functionality to the button.
  return (
    <button className={style.loginBtn} onClick={ConnectWallet}>
      Connect Wallet
    </button>
  );
};
export default ConnectWalletBtn;
