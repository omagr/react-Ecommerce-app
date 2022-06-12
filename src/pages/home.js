import Products from "../components/products";

function Home() {
  const style_button = {
    padding: "5px 10px",
    backgroundColor: "#EE5622",
    color: "#FBFEF9",
    borderRadius: 12,
    border: "none",
    margin: '20px 0 0 0',
    fontSize: '1.2rem',
    fontWeight: 600,
  }

  return (
    <>
      <div className="hero py-16">
        <div className="container flex-col sm:flex-row gap-y-10 mx-auto flex items-center justify-between">
          <div className="w-full sm:w-1/2 text-center">
            <h6 className="text-2xl mb-4"><em>are you hungry?</em></h6>
            <h2 className="text-4xl md:text-6xl font-bold">Don't Wait Now!</h2>
            <button style={style_button}> <a href="#productPage"> order now </a> </button>
          </div>
          <div className="w-full container flex items-center justify-center">
            <img className="w-3/4 animate-spin-3s" src="/assets/pizza.png" alt="pizza.png" />
          </div>
        </div>
      </div>
      <div className="hero py-16" id="productPage">
        <Products />
      </div>
    </>
  )
}

export default Home;