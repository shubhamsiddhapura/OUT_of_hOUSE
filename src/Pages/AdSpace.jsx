import React from 'react';
import CardItems from '../Component/Auth/CardItems';
// import primeBillboard from '../assets/banner1.jpg';
// import digitalScreenPlaza from '../assets/banner2.jpg';

const cardData = [
  {
    spaceName: 'Prime Billboard',
    spaceDescription: 'High-visibility billboard in downtown area.',
    owner: 'ABC Advertising Company',
    location: 'New York City, NY',
    height: '10 ft',
    width: '30 ft',
    price: 1000,
    category: 'Billboard',
    imageUrl: 'https://c8.alamy.com/comp/RYEDD5/new-york-2192019-jumbo-sized-billboard-for-amazon-prime-original-the-widow-is-put-up-on-broadway-in-midtown-manhattan-RYEDD5.jpg', // Use imported image
  },
  {
    spaceName: 'Digital Screen Plaza',
    spaceDescription: 'Interactive digital screen in busy plaza.',
    owner: 'XYZ Media Solutions',
    location: 'Los Angeles, CA',
    height: '6 ft',
    width: '12 ft',
    price: 1500,
    category: 'Digital Screen',
    imageUrl: 'https://c8.alamy.com/comp/RYEDD5/new-york-2192019-jumbo-sized-billboard-for-amazon-prime-original-the-widow-is-put-up-on-broadway-in-midtown-manhattan-RYEDD5.jpg', // Use imported image
  },
  // Add more data objects as needed
];


const AdSpace = () => {
    const userRole = 'user';
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Available Ad Spaces</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((item, index) => (
            <CardItems
              key={index}
              spaceName={item.spaceName}
              spaceDescription={item.spaceDescription}
              owner={item.owner}
              location={item.location}
              height={item.height}
              width={item.width}
              price={item.price}
              category={item.category}
              imageUrl={item.imageUrl}
              userRole={userRole}
            />
          ))}
        </div>
      </div>
    )
}

export default AdSpace