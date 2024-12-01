# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#problem = 6.45 - 7.00 ( response is coming like object but array needed)

#problem = 7.48 -7.50 ( when logged in user want to see the comment gives error also user image is not found)

#stop - 9.20 (pause edit profile)



# Deployment Process :- only deploy our backend and serve the frontend as a single page

# step 1 - import Path from path module 
# st 2 - give the frontend file to the static path (i.e. app.use(express.static(path.join(__dirname, "/frontend/dist"))))

# st3 - run : npm run build in frontend it create a dist folder then 
# st4 - then give this file to the server (app.get("*" , (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend" , "dist" , "index.html"))
# }))

# st 5 -  move package.json,node module , .env and package.lock.json file of backend to the main folder route ( home directory) and change the script accordingly.

# st 6 - delete all node module and dist folder from frontend and backend

# st 7 - use   "scripts": {
    "dev": "nodemon backend/index.js",
    "build":"npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "start":"nodemon backend/index.js"
  }, 

  scripts for bulid frontend and backend and run the server

# st 8 - push to Github repo.



edited in usegetallmessage = 11.20.20


# try to implement latest post at the top


https://instaclone-jg5h.onrender.com