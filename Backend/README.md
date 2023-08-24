### 

#วิธีติดตั้ง
1. composer install
2. เปลี่ยนชื่อไฟล์ .env.example -> .env
3. .env > แก้ไข DB CONNECTION
4. .env > เปลี่ยน PORT พวก FRONTEND URL ให้ตรงกัน
5. php artisan key:generate
6. php artisan migrate (สร้าง DB พิมพ์ yes ไปใน prompt ด้วย)
7. เสร็จแล้ว วิธี RUN ก็พิมพ์ > php artisan serve
