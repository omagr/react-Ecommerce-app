import { useContext } from 'react'
import { SearchContext } from '../context'

function SearchBar() {
    const { query, setQuery } = useContext(SearchContext);
    const style = {
        width: '75%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        border: '2px solid black',
        borderRadius: '12px',
    }
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0',
            position: 'fixed',
            bottom: 0
        }}>
            <div className="flex items-center justify-center border rounded-xl py-2 px-2 " style={style}>
                <i className="ri-search-eye-line"></i>
                <input
                    className="outline-0 border-0 w-1/2 text-sm"
                    placeholder="search your meal"
                    type="search"
                    name="search-form"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar;