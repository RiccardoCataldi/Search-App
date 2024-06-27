$(document).ready(function () {
    let totalPages = 0; // Variabile globale per tenere traccia delle pagine totali
    let pagination = null; // Variabile globale per l'oggetto di paginazione
  
    document.getElementById('searchForm').addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const mmsi = document.getElementById('mmsiInput').value;
      const searchType = document.getElementById('searchTypeSelect').value;
  
      try {
        let response;
        if (searchType === 'trajectory') {
          response = await axios.get(`/trajectory/${mmsi}`);
        } else if (searchType === 'trajectory_length') {
          response = await axios.get(`/trajectory_length/${mmsi}`);
        } else if (searchType === 'ship_type') {
          response = await axios.get(`/ship_type/${mmsi}`);
        }
  
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = generateContent(response.data, searchType);
  
        
        if (searchType === 'trajectory') {
          initializePagination(response.data.length);
        } else {
          destroyPagination(); 
        }
        
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                        Error: ${error.response ? error.response.data.error : 'An unexpected error occurred.'}
                                     </div>`;
        destroyPagination(); 
      }
    });
  
    function generateContent(data, searchType) {
      if (searchType === 'trajectory' && Array.isArray(data)) {
        return generateTable(data, 20);
      } else if (searchType === 'trajectory_length') {
        return `<div class="alert alert-light" role="alert">Trajectory Length: ${data.trajectory_length} Km</div>`;
      } else if (searchType === 'ship_type') {
        return `<div class="alert alert-light" role="alert">Ship Type: ${data.ship_type}</div>`;
      } else {
        return '<div class="alert alert-light" role="alert">No data available</div>';
      }
    }
  
    function generateTable(data, pageSize) {
      if (data.length === 0) {
        return '<div class="alert alert-info" role="alert">No data available</div>';
      }
  
      const numPages = Math.ceil(data.length / pageSize);
      let tableHTML = '';
  
     
      for (let page = 0; page < numPages; page++) {
        const start = page * pageSize;
        const end = start + pageSize;
        const pageData = data.slice(start, end);
  
      
        tableHTML += `<table class="table table-striped page-${page + 1}"><thead><tr>`;
        const headers = Object.keys(pageData[0]);
        headers.forEach(header => {
          tableHTML += `<th scope="col">${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
  
       
        pageData.forEach(item => {
          tableHTML += '<tr>';
          headers.forEach(header => {
            tableHTML += `<td>${item[header]}</td>`;
          });
          tableHTML += '</tr>';
        });
  
        tableHTML += '</tbody></table>';
      }
  
      return tableHTML;
    }
  
    function initializePagination(totalItems) {
      // Destroy previous pagination if exists
      destroyPagination();
  
      const itemsPerPage = 20; // Replace with actual items per page
      totalPages = Math.ceil(totalItems / itemsPerPage);
  
      pagination = $('#pagination').twbsPagination({
        totalPages: totalPages,
        visiblePages: 5,
        prev: '<', // Testo per il pulsante "Previous"
        next: '>', // Testo per il pulsante "Next"
        first: '<<', // Testo per il pulsante "First"
        last: '>>', // Testo per il pulsante "Last"
        onPageClick: function (event, page) {
          // Handle page click here, e.g., update table visibility
          $('.table').hide(); // Hide all tables
          $(`.page-${page}`).show(); // Show the table for the clicked page
        }
      });
    }
  
    function destroyPagination() {
      if (pagination !== null) {
        $('#pagination').twbsPagination('destroy');
        pagination = null;
        totalPages = 0;
      }
    }
  
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');
  
    window.onscroll = function () {
      scrollFunction();
    };
  
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }
  
    backToTopBtn.addEventListener('click', function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  
  });
  