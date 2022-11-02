import '../style/error.css';

function Error() {
    return (
        <div className="bodyError" style={{marginTop:'100px', position:'realtive'}}>
            <main>
                <div className="wrap">
                    <h2 className='subtitle'>Uh-Oh! Not Found</h2>
                    <h1 className='title'> 404 </h1>
                    <p className='description'>You’re in the middle of nowhere. The page you requested either was moved or doesn’t exist.</p>
                </div>
            </main>
        </div>
     
    );
}

export default Error;
