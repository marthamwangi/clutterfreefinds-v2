echo "Building project"
nx build api

echo "Building image"
docker build -t africa-south1-docker.pkg.dev/cff-v2/cffapi-docker-repo/cffapi-image -f Dockerfile .

echo "Configure authentication"
gcloud auth configure-docker africa-south1-docker.pkg.dev

echo "Tagging image"
docker tag africa-south1-docker.pkg.dev/cff-v2/cffapi-docker-repo/cffapi-image

echo "Publishing image"
docker push africa-south1-docker.pkg.dev/cff-v2/cffapi-docker-repo/cffapi-image

echo "Pull the image"
docker pull africa-south1-docker.pkg.dev/cff-v2/cffapi-docker-repo/cffapi-image

echo "Deploy new services and new revisions to Cloud Run"
gcloud run deploy cffapi-service  --image=africa-south1-docker.pkg.dev/cff-v2/cffapi-docker-repo/cffapi-image


#deloy service 
#gcloud run deploy clutterfreefinds --image africa-south1-docker.pkg.dev/cff-v1-api/cffapi-docker-repo/cffapi-image --region us-central1 --platform managed --allow-unauthenticated
#gcloud builds submit --region=us-west2 --config cloudbuild.yaml

