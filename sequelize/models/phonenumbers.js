export default (sequelize, DataTypes) => {
  const PhoneNumbers = sequelize.define('PhoneNumbers', {
    creator: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
  });
  PhoneNumbers.associate = (models) => {
    PhoneNumbers.belongsTo(models.Users, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return PhoneNumbers;
};
