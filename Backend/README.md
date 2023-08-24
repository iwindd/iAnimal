### 

#วิธีติดตั้ง
> composer install
> เปลี่ยนชื่อไฟล์ .env.example -> .env
> .env > แก้ไข DB CONNECTION
> .env > เปลี่ยน PORT พวก FRONTEND URL ให้ตรงกัน
> php artisan key:generate
> php artisan migrate (สร้าง DB พิมพ์ yes ไปใน prompt ด้วย)
> เสร็จแล้ว วิธี RUN ก็พิมพ์ > php artisan serve
