npx webpack --mode production;

if(Test-Path -Path "../book-ecommerce-app-backend/dist")
{
  Remove-Item -Path "../book-ecommerce-app-backend/dist" -Recurse;
}


Copy-Item -Path "dist" -Destination "../book-ecommerce-app-backend" -Recurse;