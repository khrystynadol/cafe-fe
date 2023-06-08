// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductComponent } from './product.component';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import {SidebarComponent} from "../sidebar/sidebar.component";
// import {NavigationComponent} from "../navigation/navigation.component";
//
// describe('ProductComponent', () => {
//   let component: ProductComponent;
//   let fixture: ComponentFixture<ProductComponent>;
//   let httpTestingController: HttpTestingController;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ProductComponent, SidebarComponent, NavigationComponent],
//       imports: [HttpClientTestingModule]
//     }).compileComponents();
//
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProductComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     httpTestingController.verify();
//   });
//
//   it('should create the product component', () => {
//     expect(component).toBeTruthy();
//
//     const url = 'http://localhost:5000/product/getAll';
//
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toEqual('GET');
//   });
//
//   it('should fetch products on component initialization', () => {
//     const mockProducts = [{ name: 'Product 1', price: 10, weight: 100 }, { name: 'Product 2', price: 20, weight: 200 }];
//     const url = 'http://localhost:5000/product/getAll';
//
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toEqual('GET');
//
//     req.flush(mockProducts);
//
//     expect(component.products).toEqual(mockProducts);
//   });
//
//   it('should render the product list when products are available', () => {
//     const mockProducts = [{ name: 'Product 1', price: 10, weight: 100 }, { name: 'Product 2', price: 20, weight: 200 }];
//     component.products = mockProducts;
//     fixture.detectChanges();
//
//     const url = 'http://localhost:5000/product/getAll';
//
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toEqual('GET');
//
//     const productListElement = fixture.nativeElement.querySelectorAll('.sales-details .details');
//     expect(productListElement.length).toEqual(mockProducts.length * 3);
//
//     for (let i = 0; i < mockProducts.length; i++) {
//       const product = mockProducts[i];
//       const productNameElement = productListElement[i].querySelector('li');
//       expect(productNameElement.textContent).toContain(product.name);
//
//       const productPriceElement = productListElement[i + mockProducts.length].querySelector('li');
//       expect(productPriceElement.textContent).toContain(product.price);
//
//       const productWeightElement = productListElement[i + 2 * mockProducts.length].querySelector('li');
//       expect(productWeightElement.textContent).toContain(product.weight);
//     }
//   });
//
//   it('should render the "No products found" message when no products are available', () => {
//     component.products = [];
//     fixture.detectChanges();
//
//     const noProductsElement = fixture.nativeElement.querySelector('.sales-boxes .title');
//     expect(noProductsElement.textContent).toContain('Product list');
//
//     const url = 'http://localhost:5000/product/getAll';
//
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.method).toEqual('GET');
//
//     const noProductsMessageElement = fixture.nativeElement.querySelector('.sales-boxes .dark-text li');
//     expect(noProductsMessageElement.textContent).toContain('No products found.');
//   });
// });
