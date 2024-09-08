import '../styles/Loading.css';

function LoadingPage(props) {
    return (
        <>
            <h2>{props.text}</h2>
            <div className='load-container'>
                <span className="load-symbol"></span>
            </div>
        </>
    );
}

export default LoadingPage;