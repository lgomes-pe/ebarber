var axios = require('axios');
const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';


export default () => {
    const categories_list = []

    axios.get(HOST + 'categories?populate=*', { // Recuperer la liste des prestations
        headers: {},
        data : ''
    }).then((response) => {
        const categories = JSON.stringify(response.data);
        console.log("Demande de la liste des categories bien reçue!");

        const parsedCategories = JSON.parse(categories).data;
        for(let i = 0; i < parsedCategories.length; i++){
            categories_list.push(parsedCategories[i]); //ajoute chaque categorie 1 par 1
        }
        console.log(categories_list);

    }).catch(() => {
        console.log("Demande de la liste des categories non reçue...");
    });



    return(
        <section className="mt-12 max-w-screen-lg mx-auto px-4">{
        categories_list.map(item => (

            <div class="bg-white dark:bg-gray-800 py-4 flex sm:flex-row items-start sm:items-center justify-between px-5 sm:px-10 shadow rounded-t">
                <div class="flex flex-col items-center mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">

                    <div class="ml-2">
                        <h1 tabindex="0" class="focus:outline-none text-gray-800 dark:text-gray-100 text-sm font-bold">{item.attributes.name}</h1>
                    </div>

                    <ul className="mt-12 space-y-6">
                        {
                        item.attributes.prestations.data.map((prest, idx_prest) => (
                            <li key={idx_prest} className="p-5 bg-white rounded-md shadow-sm">
                                    <div>
                                        <div className="justify-between sm:flex">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-medium text-cyan-600">
                                                    {prest.title}
                                                </h3>
                                                <p className="text-gray-500 mt-2 pr-2">
                                                    {prest.description}
                                                </p>
                                            </div>
                                            <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                                                <span className="flex items-center text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    {prest.price}
                                                </span>
                                                <span className="flex items-center text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                    </svg>
                                                    {prest.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                                            <span className="flex items-center text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                                </svg>
                                                {item.type}
                                            </span>
                                            <span className="flex items-center text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>

            </div>

        ))
                    }</section>
    );

}



