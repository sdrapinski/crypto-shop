import React, { useState, useContext } from "react";
import { AppContext } from "../../../state/AppContext";
import axios from "axios";
import { ProductPageProductsInterface } from "../../../interfaces/product.interface";

interface FilterProps {
  category: string;
  setProducts: (products: ProductPageProductsInterface[]) => void;
}

const Filters: React.FC<FilterProps> = ({ category, setProducts }) => {
  const appcontext = useContext(AppContext);
  const [filters, setFilters] = useState({
    price_min: '',
    price_max: '',
    crypto: false,
    rating: 0,
    days_limit: '',
    condition: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: parseFloat(e.target.value),
    }));
  };

  const renderStars = () => {
    const fullStars = Math.floor(filters.rating);
    const halfStar = filters.rating % 1 >= 0.5;
    const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    if (halfStar) {
      stars.push(<span key="half">&#9734;</span>); 
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={fullStars + i + 1}>&#9734;</span>);
    }

    return stars;
  };

  const handleFilterSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<ProductPageProductsInterface[]>(
        `${appcontext?.backendUrl}/offer/getFilteredProducts`,
        { ...filters, category },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((response) => {
        console.log(response);
        setProducts(response.data);
      });
    } catch (error) {
      console.error("Error fetching filtered results", error);
      setError("An error occurred while fetching filtered results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Filters</h4>
      <div>
        <label>Price Min:</label>
        <input
          type="number"
          name="price_min"
          value={filters.price_min}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price Max:</label>
        <input
          type="number"
          name="price_max"
          value={filters.price_max}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="crypto"
            checked={filters.crypto}
            onChange={handleChange}
          />
          Allow cryptocurrency
        </label>
      </div>
      
      <div>
  <label>Rating:</label>
  <div>
    {/* Gwiazdki */}
    <div style={{ fontSize: '24px', marginBottom: '10px' }}>
      {renderStars()}
    </div>

    {/* Suwak */}
    <input
      type="range"
      name="rating"
      min="0"
      max="10"
      step="0.5"
      value={filters.rating}
      onChange={handleRatingChange}
    />
  </div>
</div>


      <div>
        <label>On market for:</label>
        <select
          name="days_limit"
          value={filters.days_limit}
          onChange={handleChange}
        >
          <option value={0}>---------</option>
          <option value={365}>past 1 year</option>
          <option value={90}>past 90 days</option>
          <option value={30}>past 30 days</option>
          <option value={7}>past 7 days</option>
        </select>
      </div>

      <button onClick={handleFilterSubmit} disabled={loading}>
        {loading ? "Applying Filters..." : "Apply Filters"}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Filters;