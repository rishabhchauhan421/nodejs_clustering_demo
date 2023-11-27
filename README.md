# nodejs_clustering_demo

To run the demo-> `node app.js`

To check the output, go to-> http://localhost:3000/

Here, we are creating a number of worker child as much as cpu has cores, then upon hitting the get request we are killing that respective worker and starting another worker.
