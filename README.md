# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|:name, index: true, null: false, add_index :users, :name, unique: true|
|email|string|:email, index: true, unique: true|
|password|string| |

### Association
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :chats

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :chats

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
