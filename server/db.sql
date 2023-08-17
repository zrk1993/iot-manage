CREATE TABLE "t_device" (
  "id" TEXT,
  "name" TEXT,
  "product_type" TEXT,
  "mac_address" TEXT,
  "status" TEXT DEFAULT 0,
  "create_time" TEXT,
  "connect_time" TEXT,
  "disconnect_time" TEXT,
  "remote_address" TEXT DEFAULT 0,
  "bemfa_iot" TEXT,
  "bemfa_topic" TEXT,
  PRIMARY KEY ("id")
);