document.addEventListener('DOMContentLoaded', function () {
    const menuData = {
      Sunday: { meal: 'Roast Chicken', price: 12 },
      Monday: { meal: 'Spaghetti', price: 10 },
      Tuesday: { meal: 'Fish Tacos', price: 11 },
      Wednesday: { meal: 'Vegetable Stir-Fry', price: 9 },
      Thursday: { meal: 'Burger', price: 8 },
      Friday: { meal: 'Sushi', price: 15 },
      Saturday: { meal: 'Steak', price: 18 }
    };
  
    const daySelect = document.getElementById('daySelect');
    const specialResult = document.getElementById('specialResult');
    const getSpecialBtn = document.getElementById('getSpecialBtn');
  
    // Populate the dropdown with days of the week
    for (const day in menuData) {
      const option = document.createElement('option');
      option.value = day;
      option.textContent = day;
      daySelect.appendChild(option);
    }
  
    // Get today's special when the button is clicked
    getSpecialBtn.addEventListener('click', function () {
      const selectedDay = daySelect.value;
      const special = menuData[selectedDay];
  
      if (special) {
        specialResult.textContent = `Today's Special for ${selectedDay} is ${special.meal} for $${special.price}!`;
      } else {
        specialResult.textContent = `No special available for ${selectedDay}.`;
      }
    });
  });
  