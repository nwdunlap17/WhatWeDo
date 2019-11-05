class CreateContents < ActiveRecord::Migration[5.2]
  def change
    create_table :contents do |t|
      t.string :title
      t.string :category, default: ''
      t.string :description, default: "[Description]"
      t.boolean   :verified, default: false
      t.boolean   :problem, default: false

      t.timestamps
    end
  end
end