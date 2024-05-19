
const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const University = require('./University');
const Country = require('./Country');
const City = require('./City');
const Scholarship = require('./Scholarship');
const Exam = require('./Exam');
const Subject = require('./Subject');
const SubjectExam = require('./SubjectExam');
const Review = require('./Review');
const Direction = require('./Direction');
const UniversityDirection = require('./UniversityDirection');
const Language = require('./Language');
const UniversityLanguage = require('./UniversityLanguage');
const Visa = require('./Visa');
const Portfolio = require('./Portfolio');
const ReviewReply = require('./ReviewReply');
const UniImage = require('./UniImage');
const RepresentativeInfo = require('./RepresentativeInfo');
const EnrolleeInfo = require('./EnrolleeInfo');
const Request = require('./Request');
const Answer = require('./Answer');



Request.hasMany(Answer, { foreignKey: 'requestId' });
Answer.belongsTo(Request, { foreignKey: 'requestId' });

User.belongsToMany(University, { through: Request });
University.belongsToMany(User, { through: Request });

User.belongsToMany(University, { through: RepresentativeInfo });
University.belongsToMany(User, { through: RepresentativeInfo });

User.hasMany(EnrolleeInfo, { foreignKey: 'userId' });
EnrolleeInfo.belongsTo(User, { foreignKey: 'userId' });

University.hasMany(UniImage, { foreignKey: 'universityId' });
UniImage.belongsTo(University, { foreignKey: 'universityId' });

User.hasMany(Portfolio, { foreignKey: 'userId' });
Portfolio.belongsTo(User, { foreignKey: 'userId' });

Country.hasMany(Visa, { foreignKey: 'countryId' });
Visa.belongsTo(Country, { foreignKey: 'countryId' });

Language.belongsToMany(University, { through: UniversityLanguage });
University.belongsToMany(Language, { through: UniversityLanguage });

Direction.belongsToMany(University, { through: UniversityDirection ,required: true, duplicating: false });
University.belongsToMany(Direction, { through: UniversityDirection ,required: true, duplicating: false});


University.hasMany(Review, { foreignKey: 'universityId' });
Review.belongsTo(University, { foreignKey: 'universityId' });

Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

Subject.belongsToMany(Exam, { through: SubjectExam });
Exam.belongsToMany(Subject, { through: SubjectExam });

University.hasMany(Subject, { foreignKey: 'universityId' });
Subject.belongsTo(University, { foreignKey: 'universityId' });


University.hasMany(Scholarship, { foreignKey: 'universityId' });
Scholarship.belongsTo(University, { foreignKey: 'universityId' });

Country.hasMany(City, { foreignKey: 'countryId' });
City.belongsTo(Country, { foreignKey: 'countryId' });

City.hasMany(University, { foreignKey: 'cityId' });
University.belongsTo(City, { foreignKey: 'cityId' });

ReviewReply.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ReviewReply, { foreignKey: 'userId' });

Review.hasMany(ReviewReply, { foreignKey: 'reviewId', as: 'replies' });
ReviewReply.belongsTo(Review, { foreignKey: 'reviewId', as: 'review' });


module.exports = {
    User,
    University,
    Country,
    City,
    Scholarship,
    Exam,
    Subject,
    Review,
    Direction,
    UniversityDirection,
    Language,
    UniversityLanguage,
    Visa,
    Portfolio,
}