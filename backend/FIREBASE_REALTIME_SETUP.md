# Firebase Realtime Setup (Delivery Tracking)

## 1) Firebase Console Configuration

1. Create/open your Firebase project.
2. Enable **Realtime Database** (not Firestore for high-frequency location writes).
3. Copy database URL from Realtime Database section, example:
   `https://your-project-id-default-rtdb.firebaseio.com`
4. Download service account key:
   Firebase Console -> Project Settings -> Service Accounts -> Generate new private key.
5. Put the JSON file in:
   `backend/config/serviceAccountKey.json`
   or keep using:
   `backend/config/zomato-607fa-firebase-adminsdk-fbsvc-f5f782c2cc.json`

## 2) Backend ENV Required

Add these in `backend/.env`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

Notes:
- Keep `\n` escaped in `.env` private key.
- `FIREBASE_DATABASE_URL` is mandatory for Realtime Database.

## 3) Realtime Database Rules (Starter)

Use secure auth-based rules in production. Temporary starter:

```json
{
  "rules": {
    "delivery_boys": {
      ".read": true,
      "$deliveryId": {
        ".write": true
      }
    },
    "active_orders": {
      ".read": true,
      "$orderId": {
        ".write": true
      }
    }
  }
}
```

## 4) Data Structure Used By Backend

```json
{
  "delivery_boys": {
    "deliveryPartnerId": {
      "name": "Rider Name",
      "phone": "9876543210",
      "status": "online",
      "is_online": true,
      "lat": 22.7196,
      "lng": 75.8577,
      "active_order_id": "ORD123",
      "last_updated": 1708329000000
    }
  },
  "active_orders": {
    "ORD123": {
      "boy_id": "deliveryPartnerId",
      "boy_lat": 22.7196,
      "boy_lng": 75.8577,
      "status": "on_the_way",
      "polyline": "encoded_google_polyline_string",
      "restaurant_lat": 22.72,
      "restaurant_lng": 75.85,
      "customer_lat": 22.74,
      "customer_lng": 75.89,
      "distance": 3.210,
      "duration": 8.450,
      "created_at": 1708328000000,
      "last_updated": 1708329000000
    }
  },
  "route_cache": {
    "22_72_75_85_22_74_75_89": {
      "polyline": "encoded_google_polyline_string",
      "distance": 3.210,
      "duration": 8.450,
      "cached_at": 1708328000000,
      "expires_at": 1708932800000
    }
  }
}
```

## 5) What Is Implemented In Backend

- Firebase Realtime init at server startup.
- Delivery partner online/offline + live location mirror to `delivery_boys`.
- Active order location mirror to `active_orders` from socket updates.
- Order assignment uses `route_cache` first and only calls Directions API on cache miss.
- Cached route is saved in `route_cache` and reused for future same restaurant->customer pairs.
- Nearest rider lookup first tries Firebase `delivery_boys` online data, then Mongo fallback.
