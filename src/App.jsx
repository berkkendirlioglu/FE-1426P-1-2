import { useState,useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Form, Button, Table } from 'react-bootstrap/';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
import IconButton from './components/deleteButton.jsx'
import JSConfetti from 'js-confetti'


const shops = [
  {
    id: 1,
    name:"Migros",
  },
  {
    id:2,
    name:"Bim",
  },
  {
    id:3,
    name:"Şok",
  },
  {
    id:4,
    name:"A-101",
  }
];

const categories = [
  {
    id:1,
    name:"Elektronik",
  },
  {
    id:2,
    name:"Şarküteri",
  },
  {
    id:3,
    name:"Oyuncak",
  },
  {
    id:4,
    name:"Bakliyat",
  }
]

function App() {
  const [productsInput, setproductsInput] = useState({
    text:'',
    shopId:'1',
    categoryId:'1',
    id: nanoid(10),
    isBought: false
  });
  const [products, setproducts] = useState([]);
  const allPurchasedRef = useRef(false);// Tüm ürünlerin satın alındığı durumu saklar

  // filter state
  const [filterShopId, setFilterShopId] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [filterIsBought, setFilterIsBought] = useState('');
  //filter state END

  //product state'indeki verileri filtrele function
  const filteredProducts = products.filter(product => {
    return (filterShopId ? product.shopId === filterShopId : true) &&
           (filterCategoryId ? product.categoryId === filterCategoryId : true) &&
           (filterIsBought !== '' ? product.isBought === (filterIsBought === 'true') : true);
           
  });
  //product state'indeki verileri filtrele function END

  useEffect(() => {
    const totalProducts = products.length;
    const purchasedProducts = products.filter(product => product.isBought).length;

    // Tüm ürünler satın alındıysa ve bu yeni bir durumsa
    const allPurchased = totalProducts > 0 && purchasedProducts === totalProducts;
    if (allPurchased && allPurchased !== allPurchasedRef.current) {
      alert("Tebrikler tüm ürünleri aldınız.");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }

    // Güncel durumu referans olarak kaydet
    allPurchasedRef.current = allPurchased;
  }, [products]);

  // New products handles functions 
  const handleInputChange = (e) => {
    setproductsInput({...productsInput, text: e.target.value})
  }
  const handleShopIdChange = (e) => {
    setproductsInput({...productsInput, shopId: e.target.value})
  }
  const handleCategoryIdChange = (e) => {
    setproductsInput({...productsInput, categoryId:e.target.value});
  }
  // New products handles functions END

  // filter handler
  const handleFilterShopIdChange = (e) => {
    setFilterShopId(e.target.value);
  };
  const handleFilterCategoryIdChange = (e) => {
    setFilterCategoryId(e.target.value);
  };
  const handleFilterIsBoughtChange = (e) => {
    setFilterIsBought(e.target.value);
  };
  // filter handler end

  // isBought değerini tıklandığında true değerine güncelleme
  const toggleIsBought = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].isBought = !updatedProducts[index].isBought;
    setproducts(updatedProducts);
  }
  // isBought değerini tıklandığında true değerine güncelleme END

  // Sepete ekle ve products state'ine kaydet function
  const handleSubmit = () => {
    setproducts([...products, productsInput])
    setproductsInput({text:'', shopId:'1', categoryId:'1',id:nanoid(10),isBought:false})
  }
  // Sepete ekle ve products state'ine kaydet function END

  // Seçilen category ve shop id lerinin name'ini filtrele
  const getNameById = (id, datas) => {
    const selectedOption = datas.filter(data => data.id === +id);
    return selectedOption ? selectedOption[0].name : 'Belirtilmemiş';
  }
// Seçilen category ve shop id lerinin name'ini filtrele END

// Sil butonuna basıldığında ürünü sil
const handleDelete = (productId) => {
  setproducts(currentProducts => {
    const updatedProducts = currentProducts.filter(product => product.id !== productId);
    console.log(currentProducts);
    return updatedProducts;
  });
};
// Sil butonuna basıldığında ürünü sil END

const TableLine = styled.tr`
    ${({ isBought }) => isBought && `
      text-decoration:line-through;
    `}
  `;

  return (
    <>
      <div className="container py-5">
        <Form>
          <Form.Group>
            <Form.Label>New Products</Form.Label>
            <Form.Control value={productsInput.text} onChange={handleInputChange}  type="text" placeholder='Products Name'/>
            <Form.Label>Shops</Form.Label>
            <Form.Select value={productsInput.shopId} onChange={handleShopIdChange}>

              {shops.map((s) => (
                <option value={s.id}>{s.name}</option>
              ))}
            </Form.Select>
            <Form.Label>Categories:</Form.Label>
            <Form.Select value={productsInput.categoryId} onChange={handleCategoryIdChange}>
              {categories.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
            <Button className='mb-5 mt-2 w-100' onClick={handleSubmit}>Sepete Ekle</Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>Filtrele: Mağaza</Form.Label>
            <Form.Select value={filterShopId} onChange={handleFilterShopIdChange}>
              <option value="">Tümü</option>
              {shops.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Form.Select>
            <Form.Label>Filtrele: Kategori</Form.Label>
            <Form.Select value={filterCategoryId} onChange={handleFilterCategoryIdChange}>
              <option value="">Tümü</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
            <Form.Label>Filtrele: Ürün Durumu</Form.Label>
            <Form.Select value={filterIsBought} onChange={handleFilterIsBoughtChange}>
              <option value="">Tüm Ürünler</option>
              <option value="true">Alınan Ürünler</option>
              <option value="false">Alınmayan Ürünler</option>
            </Form.Select>
          </Form.Group>

          <Table className='mt-3 border-dark' striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Shops</th>
                <th>Categories</th>
                <th>ID</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <TableLine onClick={() => toggleIsBought(index)} isBought={product.isBought} key={product.id}>
                  <td>{product.text}</td>
                  <td>{getNameById(product.shopId, shops)}</td>
                  <td>{getNameById(product.categoryId, categories)}</td>
                  <td>{product.id}</td>
                  <td className='text-center'>
                    <IconButton onDelete={() => handleDelete(product.id)}/>
                  </td>
                </TableLine>
              ))}
            </tbody>
          </Table>
        </Form>
      </div>
    </>
  )
}

export default App
